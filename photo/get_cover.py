import json
import requests
import os, sys
import urllib
from PIL import Image
access_token="CAACEdEose0cBAOpLksEZCb2rjbwFB3c2SJHxv6Ugpi3aeRsLV1WGMUfI6mH4aT3si4tniY52YmC9fI5s1cDSkMbpIWxutucb9IWk1Szkpnaefq276X7ZBr6SuR48AeR4wn71ZAd0skRJImf89hRCUCwVsdRZBwZCGrdGdnoiGDh3LWvZBV7P6yTugAUy5Ej9rDKvwemTcxZBh2DJNZCZBVvz5"
fileR=open("event-id","r")
fileW=open("json", "w")
def get_cover():
	count = 0
	for line in fileR:
		if(count>=6):
			break
		url = "https://graph.facebook.com/v2.5/"+line+"?fields=cover&access_token="+access_token
		r = requests.get(url)
		if r.status_code == 200:
			dic=r.json()
			if dic.has_key('cover'):
				dic2=dic['cover']
			if dic2.has_key('source'):
				download_cover(dic2['source'], str(count)+".jpg")
				count = count + 1
				url2 = "https://graph.facebook.com/v2.5/"+line+"?&access_token="+access_token
				r2=requests.get(url2)
				if r2.status_code == 200:
						json.dump(r2.json(), fileW);

def download_cover(url,name):
	image=urllib.URLopener()
	image.retrieve(url,"cover/"+name)
	im = Image.open("cover/"+name)
	im_resize = im.resize((650, 350), Image.ANTIALIAS)
	im_resize.save("cover/"+name)
get_cover()
fileR.close()
fileW.close()
