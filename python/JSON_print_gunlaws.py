import csv, re, cStringIO, codecs, time, random, json, pprint

from pattern.web import abs, URL, DOM, plaintext, strip_between
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

# Create base array

data = {}
data["AL"] = {"Name":"Alabama"}
data["AK"] = {"Name":"Alaska"}
data["AZ"] = {"Name":"Arizona"}
data["AR"] = {"Name":"Arkansas"}
data["CA"] = {"Name":"California"}
data["CO"] = {"Name":"Colorado"}
data["CT"] = {"Name":"Connecticut"}
data["DE"] = {"Name":"Delaware"}
data["FL"] = {"Name":"Florida"}
data["GA"] = {"Name":"Georgia"}
data["HI"] = {"Name":"Hawaii"}
data["ID"] = {"Name":"Idaho"}
data["IL"] = {"Name":"Illinois"}
data["IN"] = {"Name":"Indiana"}
data["IA"] = {"Name":"Iowa"}
data["KS"] = {"Name":"Kansas"}
data["KY"] = {"Name":"Kentucky"}
data["LA"] = {"Name":"Louisiana"}
data["ME"] = {"Name":"Maine"}
data["MD"] = {"Name":"Maryland"}
data["MA"] = {"Name":"Massachusetts"}
data["MI"] = {"Name":"Michigan"}
data["MN"] = {"Name":"Minnesota"}
data["MS"] = {"Name":"Mississippi"}
data["MO"] = {"Name":"Missouri"}
data["MT"] = {"Name":"Montana"}
data["NE"] = {"Name":"Nebraska"}
data["NV"] = {"Name":"Nevada"}
data["NH"] = {"Name":"New Hampshire"}
data["NJ"] = {"Name":"New Jersey"}
data["NM"] = {"Name":"New Mexico"}
data["NY"] = {"Name":"New York"}
data["NC"] = {"Name":"North Carolina"}
data["ND"] = {"Name":"North Dakota"}
data["OH"] = {"Name":"Ohio"}
data["OK"] = {"Name":"Oklahoma"}
data["OR"] = {"Name":"Oregon"}
data["PA"] = {"Name":"Pennsylvania"}
data["RI"] = {"Name":"Rhode Island"}
data["SC"] = {"Name":"South Carolina"}
data["SD"] = {"Name":"South Dakota"}
data["TN"] = {"Name":"Tennessee"}
data["TX"] = {"Name":"Texas"}
data["UT"] = {"Name":"Utah"}
data["VT"] = {"Name":"Vermont"}
data["VA"] = {"Name":"Virginia"}
data["WA"] = {"Name":"Washington"}
data["WV"] = {"Name":"West Virginia"}
data["WI"] = {"Name":"Wisconsin"}
data["WY"] = {"Name":"Wyoming"}

output = open("JSON_data_guns.js", "wb")

# 2006 - 2009 census data

csvfile00_09 = open('us_census_state_pop_estimates_2000-2009_cleaned.csv','rb')
reader = csv.reader(csvfile00_09)

rowNumber = 0
columnNumber = 0
columns = {}
headings = []

for row in reader:
    
    if rowNumber == 0:
        for item in row:
            print item
            columns[columnNumber] = item
            columnNumber += 1
        
    else:
        print row[0][1:]
        for state in data:
            if row[0][1:] == data[state]["Name"]:   
                for item in row[1:]:
                    if int(columns[columnNumber]) >= 2006:
                        print columns[columnNumber]
                        print item
                        data[state][columns[columnNumber]] = {}
                        data[state][columns[columnNumber]]["Population"] = item
                    columnNumber += 1   

    rowNumber += 1
    columnNumber = 1

# 2010 - 2012 census data

csvfile10_12 = open('us_census_state_pop_change_2010-2012.csv','rb')
reader = csv.reader(csvfile10_12)

rowNumber = 0
columnNumber = 0
columns = {}
headings = []

for row in reader:
    
    if rowNumber == 0:
        print 'First row is ignored'
        #for item in row:
        #    print item
        #    columns[columnNumber] = item
        #    columnNumber += 1
        
    else:
        year = 2010
        column = 4
        print row[column]
        for state in data:
            if row[column] == data[state]["Name"]:   
                for count in range(0,2):
                    data[state][str(year + count)] = {}
                    data[state][str(year + count)]["Population"] = row[column + count + 1]
                    


    rowNumber += 1
    columnNumber = 1

# All gun data

fileString = '_fbi_murder_by_state_by_weapon_cleaned.csv'

for i in range(2006,2012):
    
    fileName = str(i) + fileString
    
    csvfile = open(fileName,'rb')
    reader = csv.reader(csvfile)

    rowNumber = 0
    columnNumber = 0
    columns = {}
    headings = []
    
    for row in reader:
        
        if rowNumber == 0:
            for item in row:
                print item
                columns[columnNumber] = item
                columnNumber += 1
            
        else:
            print row[0]
            for state in data:
                if row[0] == data[state]["Name"]:   
                    for item in row[1:]:
                        print columns[columnNumber]
                        print item
                        #data[state][i][columns[columnNumber]] = {}
                        data[state][str(i)][columns[columnNumber]] = item
                        columnNumber += 1   
    
        rowNumber += 1
        columnNumber = 1

gundata = [{ "state" : "Alabama" ,
            "totalpop" : "4779736" ,
            "stateabbreviation" : "AL" ,
            "region" : "Southeast" ,
            "regionsort" : "47" ,
            "gunsoncampus" : "descretion" ,
            "links" : "http://smartgunlaws.org/alabama-state-law-summary/" ,
            "alcoholserved" : "allowed" ,
            "churches" : "allowed" ,
            "arenas" : "allowed" ,
            "hospitals" : "allowed" ,
            "gunshowregulation" : "no regulation" ,
            "loststolen" : "no regulation" ,
            "lockingdevice" : "no regulation" ,
            "lockstorage" : "no regulation" ,
            "opencarryhandguns" : "allow" ,
            "opencarrylongguns" : "allow" ,
            "concealedtype" : "may issue" ,
            "privatesellerregulation" : "no regulation" ,
            "rpermitpurchase" : "n" ,
            "rregistration" : "n" ,
            "rownerlicense" : "n" ,
            "hpermitpurchase" : "n" ,
            "hregistration" : "n" ,
            "hownerlicense" : "n" ,
            "standgroundlaw" : "y" ,
            "rowNumber" : "1" } , { "state" : "Louisiana" , "totalpop" : "4533372" , "stateabbreviation" : "LA" , "region" : "Southeast" , "regionsort" : "46" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/louisiana-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "ban" , "arenas" : "allowed" , "hospitals" : "partial ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "2" } , { "state" : "Florida" , "totalpop" : "18801310" , "stateabbreviation" : "FL" , "region" : "Southeast" , "regionsort" : "45" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/florida-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "partial ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "minor regulation" , "opencarryhandguns" : "prohibit" , "opencarrylongguns" : "prohibit" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "3" } , { "state" : "Georgia" , "totalpop" : "9687653" , "stateabbreviation" : "GA" , "region" : "Southeast" , "regionsort" : "44" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/georgia-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "unclear" , "arenas" : "unclear" , "hospitals" : "unclear" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "4" } , { "state" : "North Carolina" , "totalpop" : "9535483" , "stateabbreviation" : "NC" , "region" : "Southeast" , "regionsort" : "43" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/north-carolina-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "unclear" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "5" } , { "state" : "South Carolina" , "totalpop" : "4625364" , "stateabbreviation" : "SC" , "region" : "Southeast" , "regionsort" : "42" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/south-carolina-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "ban" , "arenas" : "unclear" , "hospitals" : "ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "prohibit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "6" } , { "state" : "Tennessee" , "totalpop" : "6346105" , "stateabbreviation" : "TN" , "region" : "Southeast" , "regionsort" : "41" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/tennessee-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "7" } , { "state" : "Virginia" , "totalpop" : "8001024" , "stateabbreviation" : "VA" , "region" : "Southeast" , "regionsort" : "40" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/virginia-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "ban" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "other regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "minor regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "common" , "rowNumber" : "8" } , { "state" : "West Virginia" , "totalpop" : "1852994" , "stateabbreviation" : "WV" , "region" : "Southeast" , "regionsort" : "39" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/west-virginia-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "9" } , { "state" : "Connecticut" , "totalpop" : "3574097" , "stateabbreviation" : "CT" , "region" : "Northeast" , "regionsort" : "38" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/connecticut-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "other regulation, ubg" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "may issue" , "privatesellerregulation" : "ubg, record" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "n" , "hownerlicense" : "y" , "standgroundlaw" : "n" , "rowNumber" : "10" } , { "state" : "Delaware" , "totalpop" : "897934" , "stateabbreviation" : "DE" , "region" : "Northeast" , "regionsort" : "37" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/delaware-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "minor regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "may issue" , "privatesellerregulation" : "vbg" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "11" } , { "state" : "Maine" , "totalpop" : "1328361" , "stateabbreviation" : "ME" , "region" : "Northeast" , "regionsort" : "36" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/maine-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "other regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "12" } , { "state" : "Maryland" , "totalpop" : "5773552" , "stateabbreviation" : "MD" , "region" : "Northeast" , "regionsort" : "35" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/maryland-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "other regulation, ubg" , "loststolen" : "no regulation" , "lockingdevice" : "regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "may issue" , "privatesellerregulation" : "ubg, record" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "record" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "13" } , { "state" : "Massachusetts" , "totalpop" : "6547629" , "stateabbreviation" : "MA" , "region" : "Northeast" , "regionsort" : "34" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/massachusetts-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "prohibit" , "concealedtype" : "may issue" , "privatesellerregulation" : "record" , "rpermitpurchase" : "y" , "rregistration" : "record" , "rownerlicense" : "y" , "hpermitpurchase" : "y" , "hregistration" : "record" , "hownerlicense" : "y" , "standgroundlaw" : "n" , "rowNumber" : "14" } , { "state" : "District of Columbia" , "totalpop" : "601723" , "stateabbreviation" : "DC" , "region" : "Northeast" , "regionsort" : "33" , "gunsoncampus" : "ban - bc noconcealed weapons" , "links" : "http://smartgunlaws.org/washington-d-c-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "ubg" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "regulation" , "opencarryhandguns" : "prohibit" , "opencarrylongguns" : "prohibit" , "concealedtype" : "prohibited" , "privatesellerregulation" : "ubg, record" , "rpermitpurchase" : "n" , "rregistration" : "y" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "y" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "15" } , { "state" : "New Hampshire" , "totalpop" : "1316470" , "stateabbreviation" : "NH" , "region" : "Northeast" , "regionsort" : "32" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/new-hampshire-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "16" } , { "state" : "New Jersey" , "totalpop" : "8791894" , "stateabbreviation" : "NJ" , "region" : "Northeast" , "regionsort" : "31" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/new-jersey-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "other regulation" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "minor regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "prohibit" , "concealedtype" : "may issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "y" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "record" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "17" } , { "state" : "New York" , "totalpop" : "19378102" , "stateabbreviation" : "NY" , "region" : "Northeast" , "regionsort" : "30" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/new-york-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "partial ban" , "gunshowregulation" : "other regulation, gsbg" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "unclear" , "opencarryhandguns" : "prohibit" , "opencarrylongguns" : "allow" , "concealedtype" : "may issue" , "privatesellerregulation" : "bg" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "y" , "hownerlicense" : "y" , "standgroundlaw" : "n" , "rowNumber" : "18" } , { "state" : "Pennsylvania" , "totalpop" : "12702379" , "stateabbreviation" : "PA" , "region" : "Northeast" , "regionsort" : "29" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/pennsylvania-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "ubg" , "loststolen" : "no regulation" , "lockingdevice" : "regulation" , "lockstorage" : "unclear" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "ubg, record" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "record" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "19" } , { "state" : "Rhode Island" , "totalpop" : "1052567" , "stateabbreviation" : "RI" , "region" : "Northeast" , "regionsort" : "28" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/rhode-island-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "ubg" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "may issue" , "privatesellerregulation" : "ubg, record" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "20" } , { "state" : "Vermont" , "totalpop" : "625741" , "stateabbreviation" : "VT" , "region" : "Northeast" , "regionsort" : "27" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/vermont-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "unrestricted" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "21" } , { "state" : "Illinois" , "totalpop" : "12830632" , "stateabbreviation" : "IL" , "region" : "Midwest" , "regionsort" : "26" , "gunsoncampus" : "ban - bc noconcealed weapons" , "links" : "http://smartgunlaws.org/illinois-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "other regulation, gsbg" , "loststolen" : "no regulation" , "lockingdevice" : "regulation" , "lockstorage" : "unclear" , "opencarryhandguns" : "prohibit" , "opencarrylongguns" : "prohibit" , "concealedtype" : "no issue" , "privatesellerregulation" : "record" , "rpermitpurchase" : "y" , "rregistration" : "n" , "rownerlicense" : "y" , "hpermitpurchase" : "y" , "hregistration" : "n" , "hownerlicense" : "y" , "standgroundlaw" : "common" , "rowNumber" : "22" } , { "state" : "Indiana" , "totalpop" : "6483802" , "stateabbreviation" : "IN" , "region" : "Midwest" , "regionsort" : "25" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/indiana-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "23" } , { "state" : "Iowa" , "totalpop" : "3046355" , "stateabbreviation" : "IA" , "region" : "Midwest" , "regionsort" : "24" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/iowa-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "minor regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "24" } , { "state" : "Ohio" , "totalpop" : "11536504" , "stateabbreviation" : "OH" , "region" : "Midwest" , "regionsort" : "23" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/ohio-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "partial" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "yv" , "rowNumber" : "25" } , { "state" : "Kentucky" , "totalpop" : "4339367" , "stateabbreviation" : "KY" , "region" : "Midwest" , "regionsort" : "22" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/kentucky-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "26" } , { "state" : "Michigan" , "totalpop" : "9883640" , "stateabbreviation" : "MI" , "region" : "Midwest" , "regionsort" : "21" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/michigan-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "ban" , "gunshowregulation" : "no regulation" , "loststolen" : "regulation" , "lockingdevice" : "regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "record" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "record" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "27" } , { "state" : "Minnesota" , "totalpop" : "5303925" , "stateabbreviation" : "MN" , "region" : "Midwest" , "regionsort" : "20" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/minnesota-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "ban" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "prohibit" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "28" } , { "state" : "Missouri" , "totalpop" : "5988927" , "stateabbreviation" : "MO" , "region" : "Midwest" , "regionsort" : "19" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/missouri-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "yv" , "rowNumber" : "29" } , { "state" : "Wisconsin" , "totalpop" : "5686986" , "stateabbreviation" : "WI" , "region" : "Midwest" , "regionsort" : "18" , "gunsoncampus" : "allow" , "links" : "http://smartgunlaws.org/wisconsin-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "minor regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "yv" , "rowNumber" : "30" } , { "state" : "Kansas" , "totalpop" : "2853118" , "stateabbreviation" : "KS" , "region" : "Midwest" , "regionsort" : "17" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/kansas-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "31" } , { "state" : "North Dakota" , "totalpop" : "672591" , "stateabbreviation" : "ND" , "region" : "Midwest" , "regionsort" : "16" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/north-dakota-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "unclear" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "yv" , "rowNumber" : "32" } , { "state" : "South Dakota" , "totalpop" : "814180" , "stateabbreviation" : "SD" , "region" : "Midwest" , "regionsort" : "15" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/south-dakota-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "33" } , { "state" : "Nebraska" , "totalpop" : "1826341" , "stateabbreviation" : "NE" , "region" : "Midwest" , "regionsort" : "14" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/nebraska-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "34" } , { "state" : "Wyoming" , "totalpop" : "563626" , "stateabbreviation" : "WY" , "region" : "Northwest" , "regionsort" : "13" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/wyoming-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "partial ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "unrestricted" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "35" } , { "state" : "Idaho" , "totalpop" : "1567582" , "stateabbreviation" : "ID" , "region" : "Northwest" , "regionsort" : "12" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/idaho-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "unclear" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "common" , "rowNumber" : "36" } , { "state" : "Alaska" , "totalpop" : "710231" , "stateabbreviation" : "AK" , "region" : "Northwest" , "regionsort" : "11" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/alaska-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "unrestricted" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "yv" , "rowNumber" : "37" } , { "state" : "Montana" , "totalpop" : "989415" , "stateabbreviation" : "MT" , "region" : "Northwest" , "regionsort" : "10" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/montana-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "38" } , { "state" : "Oregon" , "totalpop" : "3831074" , "stateabbreviation" : "OR" , "region" : "Northwest" , "regionsort" : "9" , "gunsoncampus" : "allow" , "links" : "http://smartgunlaws.org/oregon-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "ban" , "gunshowregulation" : "other regulation, gsbg" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "vbg" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "common" , "rowNumber" : "39" } , { "state" : "Washington" , "totalpop" : "6724540" , "stateabbreviation" : "WA" , "region" : "Northwest" , "regionsort" : "8" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/washington-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "partial ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "record" , "hownerlicense" : "n" , "standgroundlaw" : "common" , "rowNumber" : "40" } , { "state" : "California" , "totalpop" : "37253956" , "stateabbreviation" : "CA" , "region" : "Southwest" , "regionsort" : "7" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/california-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "unclear" , "arenas" : "unclear" , "hospitals" : "unclear" , "gunshowregulation" : "other regulation, ubg" , "loststolen" : "no regulation" , "lockingdevice" : "regulation" , "lockstorage" : "unclear" , "opencarryhandguns" : "prohibit" , "opencarrylongguns" : "prohibit" , "concealedtype" : "may issue" , "privatesellerregulation" : "ubg, record" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "y" , "hownerlicense" : "n" , "standgroundlaw" : "common" , "rowNumber" : "41" } , { "state" : "Hawaii" , "totalpop" : "1360301" , "stateabbreviation" : "HI" , "region" : "Southwest" , "regionsort" : "6" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/hawaii-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "may issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "y" , "rregistration" : "y" , "rownerlicense" : "n" , "hpermitpurchase" : "y" , "hregistration" : "y" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "42" } , { "state" : "Colorado" , "totalpop" : "5029196" , "stateabbreviation" : "CO" , "region" : "Southwest" , "regionsort" : "5" , "gunsoncampus" : "allow" , "links" : "http://smartgunlaws.org/colorado-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "other regulation, gsbg" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "43" } , { "state" : "Utah" , "totalpop" : "2763885" , "stateabbreviation" : "UT" , "region" : "Southwest" , "regionsort" : "4" , "gunsoncampus" : "allow" , "links" : "http://smartgunlaws.org/utah-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "ban" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "permit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "44" } , { "state" : "Arizona" , "totalpop" : "6392017" , "stateabbreviation" : "AZ" , "region" : "Southwest" , "regionsort" : "3" , "gunsoncampus" : "descretion" , "links" : "http://smartgunlaws.org/arizona-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "minor regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "unrestricted" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "prohibit" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "prohibit" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "45" } , { "state" : "Nevada" , "totalpop" : "2700551" , "stateabbreviation" : "NV" , "region" : "Southwest" , "regionsort" : "2" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/nevada-state-law-summary/" , "alcoholserved" : "allowed" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "vbg" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "46" } , { "state" : "New Mexico" , "totalpop" : "2059179" , "stateabbreviation" : "NM" , "region" : "Southwest" , "regionsort" : "1" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/new-mexico-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "allowed" , "arenas" : "allowed" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "common" , "rowNumber" : "47" } , { "state" : "Texas" , "totalpop" : "25145561" , "stateabbreviation" : "TX" , "region" : "Southeast" , "regionsort" : "51" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/texas-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "prohibit" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "48" } , { "state" : "Oklahoma" , "totalpop" : "3751351" , "stateabbreviation" : "OK" , "region" : "Southeast" , "regionsort" : "50" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/oklahoma-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "allowed" , "arenas" : "ban" , "hospitals" : "allowed" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "49" } , { "state" : "Arkansas" , "totalpop" : "2915918" , "stateabbreviation" : "AR" , "region" : "Southeast" , "regionsort" : "49" , "gunsoncampus" : "ban" , "links" : "http://smartgunlaws.org/arkansas-state-law-summary/" , "alcoholserved" : "ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "unclear" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "n" , "rowNumber" : "50" } , { "state" : "Mississippi" , "totalpop" : "2967297" , "stateabbreviation" : "MS" , "region" : "Southeast" , "regionsort" : "48" , "gunsoncampus" : "allow" , "links" : "http://smartgunlaws.org/mississippi-state-law-summary/" , "alcoholserved" : "partial ban" , "churches" : "ban" , "arenas" : "ban" , "hospitals" : "ban" , "gunshowregulation" : "no regulation" , "loststolen" : "no regulation" , "lockingdevice" : "no regulation" , "lockstorage" : "no regulation" , "opencarryhandguns" : "allow" , "opencarrylongguns" : "allow" , "concealedtype" : "shall issue" , "privatesellerregulation" : "no regulation" , "rpermitpurchase" : "n" , "rregistration" : "n" , "rownerlicense" : "n" , "hpermitpurchase" : "n" , "hregistration" : "n" , "hownerlicense" : "n" , "standgroundlaw" : "y" , "rowNumber" : "51" }];

for g in gundata:
    if g["stateabbreviation"] in data:
        data[g["stateabbreviation"]]["gunsoncampus"] = g["gunsoncampus"]
        data[g["stateabbreviation"]]["alcoholserved"] = g["alcoholserved"]
        data[g["stateabbreviation"]]["churches"] = g["churches"]
        data[g["stateabbreviation"]]["arenas"] = g["arenas"]
        data[g["stateabbreviation"]]["hospitals"] = g["hospitals"]
        data[g["stateabbreviation"]]["gunshowregulation"] = g["gunshowregulation"]
        data[g["stateabbreviation"]]["loststolen"] = g["loststolen"]
        data[g["stateabbreviation"]]["lockingdevice"] = g["lockingdevice"]
        data[g["stateabbreviation"]]["lockstorage"] = g["lockstorage"]
        data[g["stateabbreviation"]]["opencarryhandguns"] = g["opencarryhandguns"]
        data[g["stateabbreviation"]]["opencarrylongguns"] = g["opencarrylongguns"]
        data[g["stateabbreviation"]]["concealedtype"] = g["concealedtype"]
        data[g["stateabbreviation"]]["privatesellerregulation"] = g["privatesellerregulation"]
        data[g["stateabbreviation"]]["rpermitpurchase"] = g["rpermitpurchase"]
        data[g["stateabbreviation"]]["rregistration"] = g["rregistration"]
        data[g["stateabbreviation"]]["rownerlicense"] = g["rownerlicense"]
        data[g["stateabbreviation"]]["hpermitpurchase"] = g["hpermitpurchase"]
        data[g["stateabbreviation"]]["hregistration"] = g["hregistration"]
        data[g["stateabbreviation"]]["hownerlicense"] = g["hownerlicense"]
        data[g["stateabbreviation"]]["standgroundlaw"] = g["standgroundlaw"]


# Write file
key = [{'loststolen' : {
		'regulation': 'Requires reporting lost or stolen guns',
		'civil liability': 'Owner is not liable in case when a crime is committed with the gun if the owner has reported the gun is missing',
		'no regulation': 'No regulation'
	},
	'lockingdevice': {
		'no regulation': 'No regulation or law is unclear',
		'regulation': 'Locking device required on some or all firearm sales'
	},
	'longgunpermit': {
		'y': 'A permit or license is required.',
		'n': 'No regulation or law is unclear.',
		'permit': 'A permit or license is required.',
		'license': 'A permit or license is required.',
		'both': 'Permit and license regulations apply.'
	},
	'handgunpermit': {
		'y': 'A permit or license is required.',
		'n': 'No regulation or law is unclear.',
		'permit': 'A permit or license is required.',
		'license': 'A permit or license is required.',
		'both': 'Permit and license regulations apply.'
	},
	'hregistration': {
		'y': 'Registration is required',
		'record': 'A less formal record is kept',
		'n': 'Registration is not required or law is unclear',
		'prohibit': 'Registration is prohibited'
	},
	'rregistration': {
		'y': 'Registration is required',
		'record': 'A less formal record is kept',
		'n': 'Registration is not required or law is unclear',
		'prohibit': 'Registration is prohibited'
	},
	'concealedtype': {
		'may issue': 'Permit to carry a concealed handgun is issued if permit requirements are met, but is also up to the discretion of local authorities.',
		'shall issue': 'Permit to carry a concealed handgun is issued when permit requirements are met.',
		'unrestricted': 'A permit is not required to carry a concealed handgun.',
		'no issue': 'Does not allow a private citizen to carry a concealed handgun in public.',
		'prohibited': 'Does not allow a private citizen to carry a concealed handgun in public.'
	},
	'opencarryhandguns': {
		'allow': 'Allows open carrying of handguns without permit or license.',
		'permit': 'Allows open carrying of handguns with a permit or license.',
		'prohibit': 'Prohibits open carrying of handguns.'
		
	},
	
	'opencarrylongguns': {
		'allow': 'Allows open carrying of long guns without permit or license.',
		'prohibit': 'Prohibits open carrying of long guns.'
	},
	'gunsoncampus': {
		'ban': 'Prohibits guns on college campuses.',
		'ban - bc noconcealed weapons': 'Prohibits guns on college campuses.',
		'descretion': 'Left to the discretion of college administrators.',
		'allow': 'Allows firearms on campus when adhering to firearm carrying laws.'
		
	},
	'alcoholserved' : {
		'allowed': 'No specific regulation banning firearms at establishments serving alcohol.',
		'partial ban': 'Prohibits firearms at most establishments serving alcohol, but may allow in certain circumstances where consuming alcohol is not the main purpose of business.',
		'ban': 'Prohibits firearms at establishments serving alcohol.'
	},
	'churches' : {
		'unclear': 'No specific regulation or law is unclear.',
		'allowed': 'No specific regulation or law is unclear.',
		'partial ban': 'Prohibits firearms at places of worship unless otherwise posted.',
		'ban': 'Prohibits firearms at places of worship.'
	},
	'arenas' : {
		'unclear': 'No specific regulation or law is unclear.',
		'allowed': 'No specific regulation or law is unclear.',
		'ban': 'Prohibits firearms at sporting arenas or events.'
	},
	'hospitals' : {
		'unclear': 'No specific regulation or law is unclear.',
		'allowed': 'No specific regulation or law is unclear.',
		'partial ban': 'Prohibits firearms at medical facilities in some circumstances.',
		'ban': 'Prohibits firearms at hospitals.'
	},
	'standgroundlaw':{
		'y': 'Law permits deadly force in public places with no duty to retreat.',
		'yv': 'Law permits deadly force while in a vehicle with no duty to retreat.',
		'common': 'Weaker self-defense law defined through a combination of case law, jury decisions and statutes.',
		'n': 'No law, the law is unclear or is prohibited'		
	},
	
	'gunshowregulation': {
		'other regulation': 'Imposes requirements on gun shows.',
		'ubg': 'Requires background checks during the sale of all firearms including at gun shows.',
		'other regulation, ubg': 'Requires background checks during the sale of all firearms including at gun shows and imposes other regulations.',
		'gsbg': 'Requires background checks during the sale of all firearms at gun shows.',
		'other regulation, gsbg': 'Requires background checks during the sale of all firearms at gun shows and imposes other regulations.',
		'no regulation': 'No specific regulation or the law is unclear'

	},
	'privatesellerregulation': {
		'ubg, record': 'Requires universal background checks on all firearms and imposes other record keeping or reporting requirements.',
		'vbg':'Voluntary background checks by private sellers.',
		'ubg': 'Requires universal background checks on all firearms including by private sellers.',
		'no regulation': 'No specific private seller regulation or law is unclear.',
		'record': 'Record keeping or other reporting requirements.',
		'bg': 'A background check is required for the private sale of some types of firearms.'
	}
}]

data = 'var JSON_data = ' + str(json.dumps(data,sort_keys=True,indent=4, separators=(',', ': '))) + '\n'
data += 'var gun_key = ' + str(json.dumps(key,sort_keys=True,indent=4, separators=(',', ': ')))

output.write(data)
output.close()
