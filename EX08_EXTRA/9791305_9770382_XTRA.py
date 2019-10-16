import re
filename = str(input()).rstrip()
hmtlFile = open(filename)
fileContent = hmtlFile.read()
tagsIndexes = re.finditer(r'(</|<)([\w\s="-]*>)',fileContent)
tags = [(index.start(),index.end()) for index in tagsIndexes]
for i in range(len(tags)-1):
    tag = tags[i]
    nextTag = tags[i+1]
    print(fileContent[tag[0]:tag[1]])
    text = str(fileContent[tag[1]:nextTag[0]])
    if (not text.startswith('\n')):
        print("\n"+text)

# EDSON YUDI TOMA 9791305
# JOSUE GRACE KABONGO KALALA 9770382