"""Retrieve Commons source pages and preview candidates, never infer rights from a filename."""
import sys, json, urllib.request, urllib.parse, re
from pathlib import Path
from bs4 import BeautifulSoup
from PIL import Image, ImageOps, ImageDraw
from io import BytesIO

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.photo-research'
WORK.mkdir(exist_ok=True)
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'EquiEducation/1.0 (educational media verification)'}), timeout=45).read()
def category(name):
    s=BeautifulSoup(get('https://commons.wikimedia.org/wiki/Category:'+urllib.parse.quote(name)), 'html.parser')
    print('\n'.join(a.get('title','') for a in s.select('.gallerytext a') if a.get('title','').startswith('File:')))
def photo(title):
    url='https://commons.wikimedia.org/wiki/'+urllib.parse.quote('File:'+title.replace(' ','_'))
    s=BeautifulSoup(get(url),'html.parser')
    original=s.select_one('.fullImageLink a')['href'].split('?')[0]
    desc=s.select_one('.description')
    author=s.select_one('#fileinfotpl_aut + td')
    if not author:
        label=s.select_one('#fileinfotpl_aut')
        author=label.find_next_sibling() if label else None
    licenses=list(dict.fromkeys(a.get('href') for a in s.select('.licensetpl a') if 'creativecommons.org/licenses/' in a.get('href','') or 'creativecommons.org/publicdomain/' in a.get('href','')))
    cats=[a.get_text() for a in s.select('#mw-normal-catlinks li a')]
    data={'title':title,'sourceUrl':url,'originalUrl':original,'description':desc.get_text(' ',strip=True) if desc else '', 'author':author.get_text(' ',strip=True) if author else '', 'licenses':licenses,'categories':cats}
    key=re.sub('[^a-zA-Z0-9]+','-',title).strip('-')
    (WORK/(key+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8')
    (WORK/(key+'.html')).write_text(str(s),encoding='utf8')
    p=WORK/(key+'.jpg')
    if not p.exists():
        preview=s.select_one('.fullImageLink img')['src'].split('?')[0]
        try: raw=get(original)
        except Exception: raw=get(preview)
        im=Image.open(BytesIO(raw)); im=ImageOps.exif_transpose(im); im.thumbnail((1000,800)); im.convert('RGB').save(p,quality=90)
    print(json.dumps(data,ensure_ascii=False))
if sys.argv[1]=='category':category(sys.argv[2])
else:
    for title in sys.argv[1:]:
        try:photo(title)
        except Exception as e:print(title,str(e))
