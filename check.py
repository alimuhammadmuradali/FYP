import requests

import glob
import os

reqUrl = "http://192.168.0.114:3000/upload"
current_working_dir = r'C:\Users\3m\Desktop\mydir'

headersList = {"Accept": "*/*"}
payload = {"modelName":"Fire"} 

os.chdir(current_working_dir)
myFiles = glob.glob('*.txt')

for f in myFiles:
	abs_pathname = os.path.join(current_working_dir, f)
	fname = abs_pathname.split(".")[0]
	file2 =fname+"-1.png"
	file3 = fname+"-2.png"
	if(os.path.exists(file3) and os.path.exists(file2)):
		post_files = [("files",open(abs_pathname,"rb")),("files",open(file2,"rb")),("files",open(file3,"rb"))]
		response = requests.request("POST", reqUrl, data=payload, files=post_files, headers=headersList)
		if(response.ok):
			print(response.text)
			os.remove(abs_pathname)
			os.remove(file2)
			os.remove(file3)
		else:
			print('false')


