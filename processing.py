import numpy as np
import pandas as pd
import glob



#Commenting still required
#subtitles["chapters"] = ""

# print(chapters)
# print(subtitles)

# for indexa, rowa in subtitles.iterrows():

#     for index, row in chapters.iterrows():
    

#      if (rowa['start'] > row['start_time'] and rowa['start'] < row['end_time']):
         
#          stuff = row['title']
#          subtitles.iloc[indexa,3] = stuff
#          #print(indexa)


df = pd.DataFrame([], columns=["start_time","end_time","title", "text"])

for filepath in glob.iglob('chapters/*.csv'):

    name = filepath.replace('chapters','')
    print(name)
    chapters = pd.read_csv(filepath)
    chapters["text"] = ""
    subtitles = pd.read_csv("subtitles/" + name)

    for indexa, rowa in chapters.iterrows():

        for index, row in subtitles.iterrows():
        
            stuff = row['text']
            if (row['start'] >= rowa['start_time'] and row['start'] <= rowa['end_time']):
            
                
                
                chapters.iloc[indexa,3] = chapters.iloc[indexa,3] + stuff
                #print(indexa)
            else:

                if (indexa == len(chapters) - 1):
                    chapters.iloc[indexa,3] = stuff
                    
    df = pd.concat([df, chapters],axis=0)#[chapters["start_time"], chapters["end_time"], chapters["title"], chapters["text"]]
print(df)
df.to_csv("data.csv")

