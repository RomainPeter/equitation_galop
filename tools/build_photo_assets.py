"""Build only the reviewed selection. No crop, colour filter or recolouring."""
from pathlib import Path
import json, re
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
selection=[
 ('n1','ArabianSahid-jpg','coat:noir','lesson','Catégorie Commons Black horses ; poils, crinière, queue et membres noirs visibles. Cheval entier, lumière du jour.'),
 ('n2','Cheval-cr-tois-noir-Grillos-stables-jpg','coat:noir','practice','Description : Black Cretan horse ; catégorie Black horses. Poils et crins noirs, membres visibles, sans zones fauves caractéristiques du bai.'),
 ('n3','Asturcon-jpg','coat:noir','test','Catégorie Black horses ; corps et crins noirs visibles en extérieur. Petites marques blanches aux pieds : elles ne changent pas la robe de base.'),
 ('a1','Chestnut-mare-png','coat:alezan','lesson','Description chestnut mare ; catégorie Chestnut horses. Poils et crins roux, membres sans pointes noires ; balzanes blanches distinctes de la robe.'),
 ('a2','Chestnut-horse-jpg','coat:alezan','practice','Catégorie Chestnut horses ; cheval entier avec poils et crins roux, membres roux sans pointes noires. La catégorie est corroborée par les critères visibles.'),
 ('a3','Barbe-Horse-01-jpg','coat:alezan','test','Catégorie Chestnut horses ; jument Defia identifiée dans la description. Crinière et queue rousses, poils roux, membres sans pointes noires visibles. La race Barbe ne sert pas à déduire la robe.'),
 ('b1','American-quarter-horse-jpg','coat:bai','lesson','Catégorie Bay horses ; corps brun avec crinière, queue et bas des membres noirs visibles. Cheval entier. Une marque blanche au pied ne supprime pas les pointes noires.'),
 ('b2','Bay-Horse-6014766934-jpg','coat:bai','practice','Description explicite de la robe bai par le photographe, catégorie Bay horses ; corps brun, crins et membres noirs visibles au-dessus des balzanes blanches.'),
 ('b3','Bay-Horse-2902721873-jpg','coat:bai','test','Description Bay Horse et catégorie Bay horses ; corps brun, crins et membres noirs visibles, cheval entier. Marques blanches aux pieds.'),
 ('o1','Etrille-Caoutchouc-JPG','object:curry','all','Description : étrille en caoutchouc ; reliefs visibles. Un exemple parmi plusieurs modèles.'),
 ('o2','Bouchon-Chiendent-JPG','object:brush','all','Description : bouchon en chiendent ; fibres longues et raides visibles. La dureté se vérifie au toucher au club.'),
 ('o3','Brosse-douce-JPG','object:softbrush','all','Description : brosse douce ; poils courts et serrés visibles. La souplesse ne se prouve pas sur photo : comparer au club.'),
 ('o4','Cure-pied-JPG','object:pick','all','Description : cure-pied avec brossette ; pointe coudée et manche visibles. Il existe aussi des modèles sans brossette.'),
]
credits=[]
for id,key,subject,role,why in selection:
    src=json.loads((ROOT/'.photo-research'/f'{key}.json').read_text(encoding='utf8'))
    license_url=src['licenses'][0].replace('//creativecommons','https://creativecommons')
    code=re.search(r'licenses/(by(?:-sa)?)/([\d.]+)',license_url)
    license_name='CC '+code[1].upper()+' '+code[2]
    file=f"assets/photos/{'robes' if subject.startswith('coat:') else 'pansage'}/{id}.webp"
    out=ROOT/file;out.parent.mkdir(parents=True,exist_ok=True)
    im=Image.open(ROOT/'.photo-research'/f'{key}.jpg').convert('RGB'); im.thumbnail((1000,800)); im.save(out,'WEBP',quality=88,method=6)
    credits.append(dict(id=id,file=file,title=src['title'],author=src['author'],sourceUrl=src['sourceUrl'],originalUrl=src['originalUrl'],license=license_name,licenseUrl=license_url,adaptationLicense=license_name,modifications='Orientation EXIF appliquée si nécessaire ; réduction proportionnelle (1000 × 800 maximum), conversion JPEG intermédiaire puis WebP qualité 88. Aucun recadrage ni retouche des couleurs.',retrieved='2026-11-08',subject=subject,role=role,classification=why,sourceDescription=src['description'],sourceCategories=src['categories'],width=im.width,height=im.height,bytes=out.stat().st_size))
(ROOT/'assets/photos/credits.json').write_text(json.dumps(credits,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(ROOT/'assets/photos/catalog.js').write_text('/* Generated from credits.json by tools/build_photo_assets.py */\nconst PHOTOS='+json.dumps(credits,ensure_ascii=False)+';\n',encoding='utf8')
print(len(credits),'photos;',sum(p['bytes'] for p in credits),'bytes')
