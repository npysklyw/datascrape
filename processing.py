import numpy as np
import pandas as pd

chapters = pd.read_csv('./test.csv')

subtitles = pd.read_csv('subs.csv')

#subtitles["chapters"] = ""
chapters["text"] = ""
print(chapters)
print(subtitles)

# for indexa, rowa in subtitles.iterrows():

#     for index, row in chapters.iterrows():
    

#      if (rowa['start'] > row['start_time'] and rowa['start'] < row['end_time']):
         
#          stuff = row['title']
#          subtitles.iloc[indexa,3] = stuff
#          #print(indexa)

for indexa, rowa in chapters.iterrows():

    for index, row in subtitles.iterrows():
    

     if (row['start'] > rowa['start_time'] and row['start'] < rowa['end_time']):
         
         stuff = row['text']
         chapters.iloc[indexa,3] = chapters.iloc[indexa,3] + stuff
         #print(indexa)
    else:
        stuff = row['text']

        if (indexa != len(chapters)-1):
            chapters.iloc[indexa+1,3] = stuff

print(chapters)