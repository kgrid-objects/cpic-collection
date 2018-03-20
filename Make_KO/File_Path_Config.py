# File_path_Configure
# Last updated: 3/20/2018
# By: Koki Sasagawa

import os

current_path = os.getcwd()
path = current_path.split('/')
# Directory path for KO storage
new_path1 = '/' + path[1] + '/' + path[2] + '/' + 'activator/shelf'
# Directory path for adapter storage
new_path2 = '/' + path[1] + '/' + path[2] + '/' + 'activator/adapters'

try: 
    os.makedirs(new_path1, exist_ok=False)
except: 
    print("The '~/activator/shelf' directory already exists.")
try:
    os.makedirs(new_path2, exist_ok=False)
except: 
    print("The '~/activator/adapters' directory already exists.")
    
