var gun_key = {
        "alcoholserved": {
            "name":"Establishments Serving Alcohol",
            "ban":{
                "desc":"Prohibits firearms at establishments serving alcohol.",
                "rating":"GREAT",
                "name":"Banned"
            },
            "partial ban": {
                "desc":"Prohibits firearms at most establishments serving alcohol, but may allow in certain circumstances where consuming alcohol is not the main purpose of business.",
                "rating":"GOOD",
                "name":"Partial Ban"
            },
            "allowed":{
                "desc":"No specific regulation banning firearms at establishments serving alcohol.",
                "rating":"NONE", //similar to the hospitals example, should this actually be BAD or AWFUL?
                "name":"No ban"
            }
        },
        "arenas": {
            "name":"Arenas",
            "ban": {
                "desc":"Prohibits firearms at sporting arenas or events.",
                "rating":"GREAT",
                "name":"Prohibited"
            },
            "allowed": {
                "desc":"No specific regulation or law is unclear.",
                "rating":"NONE",
                "name":"No specific regulation"
            },
            "unclear": {
                "desc":"The law is unclear.",
                "rating":"UNCLEAR",
                "name":"Law is unclear"
            }
            
        },
        "churches": {
            "name":"Places of Worship",
            "ban": {
                "desc":"Prohibits firearms at places of worship.",
                "rating":"GREAT",
                "name":"Prohibited"
            },
            "partial": {
                "desc":"Prohibits firearms at places of worship unless otherwise posted.",
                "rating":"GOOD",
                "name":"Prohibited unless posted"
            },
            "allowed": {
                "desc":"No specific regulation",
                "rating":"NONE",
                "name":"No specfic regulation"
            },
            "unclear": {
                "desc":"The law is unclear.",
                "rating":"UNCLEAR",
                "name":"Unclear"
            }
        },
        "concealedtype": {
            "name":"Concealed Handguns",
            "no issue": {
                "desc":"Does not allow a private citizen to carry a concealed handgun in public.",
                "rating":"GOOD",
                "name":"Not allowed"
            },
            "may issue": {
                "desc":"Permit to carry a concealed handgun is issued if permit requirements are met, but is also up to the discretion of local authorities.",
                "rating":"BAD",
                "name":"Permits on req's and authority discretion"
            },
            /*"prohibited": {
                "desc":"Private citizens are prohibited from carrying a concealed handgun in public.",
                "rating":"GREAT",
                "name":"Prohibited"
            },*/
            "shall issue": {
                "desc":"Permit to carry a concealed handgun is issued when permit requirements are met.",
                "rating":"BAD",
                "name":"Permits issued"
            },
            "unrestricted": {
                "desc":"A permit is not required to carry a concealed handgun.",
                "rating":"AWFUL",
                "name":"No permit required"
            }
        },
        "gunshowregulation": {
            "name":"Firearm Sales at Gun Shows",
            /*"gsbg": {
                "desc":"Requires background checks during the sale of all firearms at gun shows.",
                "rating":"GREAT",
                "name":"Background check required"
            },*/
            "other regulation, ubg": {
                "desc":"Requires background checks during the sale of all firearms including at gun shows and imposes other regulations.",
                "ratings":"GREAT",
                "name":"Background checks everywhere"
            },
            "ubg": {
                "desc":"Requires background checks during the sale of all firearms including at gun shows.",
                "ratings":"GREAT",
                "name":"Background checks required"
            },
            "other regulation": {
                "desc":"Imposes requirements on gun shows.",
                "rating":"GOOD",
                "name":"Regulated"
            },
            "other regulation, gsbg": {
                "desc":"Requires background checks during the sale of all firearms at gun shows and imposes other regulations.",
                "rating":"GOOD",
                "name":"Background checks and other restrictions"
            },
            "no regulation": {
                "desc":"No specific regulation or the law is unclear",
                "rating":"NONE",
                "name":"No regulation"
            }
        },
        "gunsoncampus": {
            "name":"Firearms on College Campuses",
            "allow": {
                "desc":"Allows firearms on campus when adhering to firearm carrying laws.",
                "rating":"BAD",
                "name":"Allowed"
            },
            "ban": {
                "desc":"Prohibits guns on college campuses.",
                "rating":"GREAT",
                "name":"Prohibited"
            },
            "ban - bc noconcealed weapons": {
                "desc":"Prohibits guns on college campuses.",
                "rating":"GREAT",
                "name":"Prohibited - concealed weapons ban"
            },
            "descretion": {
                "desc":"Left to the discretion of college administrators.",
                "rating":"NONE",
                "name":"Discretion of administrators"
            }
        },
        "hownerlicense": {
            "name":"Hand Gun Permits",
            /*"both": {
                "desc":"Permit and license regulations apply.",
                "rating":"GOOD", 
                "name":"Permit and license required"
            },*/
            "license": {
                "desc":"A permit or license is required.",
                "rating":"GREAT", 
                "name":"License required"
            },
            "n": {
                "desc":"No regulation or law is unclear.",
                "rating":"NONE",
                "name":"No regulation or law is unclear"
            },
            "permit": {
                "desc":"A permit or license is required.",
                "rating":"GREAT", 
                "name":"Permit required"
            },
            "y": {
                "desc":"A permit or license is required.",
                "rating":"GREAT", 
                "name":"Permit or license required"
            }
        },
        "hospitals": {
            "name":"Firearms in Hospitals",
            "allowed": {
                "desc":"No specific regulation or law is unclear.", //this is weird since the title is "allowed"
                "rating":"BAD", //should this be AWFUL bc of above?
                "name":"Allowed"
            },
            "ban": {
                "desc":"Prohibits firearms at hospitals.",
                "rating":"GREAT",
                "name":"Prohibited"
            },
            "partial ban": {
                "desc":"Prohibits firearms at medical facilities in some circumstances.",
                "rating":"GOOD",
                "name":"Prohibited in some cases"
            },
            "unclear": {
                "desc":"No specific regulation or law is unclear.",
                "rating":"UNCLEAR", //should this be NONE? Guardian marked it unclear, but then went with the generic description. Either way is cool.
                "name":"Law is unclear"
            }
        },
        "hregistration": {
            "name":"Handgun Registration",
            "n": {
                "desc":"Registration is not required or law is unclear",
                "rating":"NONE",
                "name":"Not Required"
            },
            "prohibit": {
                "desc":"Registration is prohibited",
                "rating":"AWFUL",
                "name":"Prohibited"
            },
            "record": {
                "desc":"A less formal record is kept",
                "rating":"GOOD",
                "name":"Informal Record"
            },
            "y": {
                "desc":"Registration is required",
                "rating":"GREAT",
                "name":"Required"
            }
        },
        "lockingdevice": {
            "name":"Locking Devices",
            "no regulation": {
                "desc":"No regulation or law is unclear",
                "rating":"NONE",
                "name":"No regulation"
            },
            "regulation": {
                "desc":"Locking device required on some or all firearm sales",
                "rating":"GOOD",
                "name":"Lock device required"
            }
        },
        "longgunpermit": {
            "name":"Longgun Permits",
            "both": {
                "desc":"Permit and license regulations apply.",
                "rating":"GOOD", 
                "name":"Permit and license required"
            },
            "license": {
                "desc":"A license is required.",
                "rating":"GREAT", 
                "name":"License required"
            },
            "n": {
                "desc":"No regulation or law is unclear.",
                "rating":"NONE",
                "name":"No regulation"
            },
            "permit": {
                "desc":"A permit is required.",
                "rating":"GREAT", 
                "name":"Permit required"
            },
            "y": {
                "desc":"A permit or license is required.",
                "rating":"GREAT", 
                "name":"Permit or license required"
            }
        },
        "loststolen": {
            "name":"Lost or Stolen Firearms",
            /*"civil liability": {
                "desc":"Owner is not liable in case when a crime is committed with the gun if the owner has reported the gun is missing",
                "rating":"GREAT",
                "name":"Owner liable if reported missing"
            },*/
            "no regulation": {
                "desc":"No regulation",
                "rating":"NONE",
                "name":"No regulation"
            },
            "regulation": {
                "desc":"Requires reporting lost or stolen guns",
                "rating":"GREAT",
                "name":"Reporting required"
            }
        },
        "opencarryhandguns": {
            "name":"Openly Carried Handguns",
            "allow": {
                "desc":"Allows open carrying of handguns without permit or license.",
                "rating":"AWFUL",
                "name":"Allowed without permit"
            },
            "permit": {
                "desc":"Allows open carrying of handguns with a permit or license.",
                "rating":"BAD",
                "name":"Allowed with permit"
            },
            "prohibit": {
                "desc":"Prohibits open carrying of handguns.",
                "rating":"GREAT", 
                "name":"Prohibited"
            }
        },
        "opencarrylongguns": {
            "name":"Openly Carried Longguns",
            "allow": {
                "desc":"Allows open carrying of long guns without permit or license.",
                "rating":"AWFUL", 
                "name":"Allowed"
            },
            "prohibit": {
                "desc":"Prohibits open carrying of long guns.",
                "rating":"GREAT",
                "name":"Prohibited"
            }
        },
        "privatesellerregulation": {
            "name":"Private Seller Regulation",
            "bg": {
                "desc":"A background check is required for the private sale of some types of firearms.",
                "rating":"GOOD",
                "name":"Background check required"
            },
            "no regulation": {
                "desc":"No specific private seller regulation or law is unclear.",
                "rating":"NONE",
                "name":"No regulation"
            },
            "record": {
                "desc":"Record keeping or other reporting requirements.",
                "rating":"GOOD",
                "name":"Record or other reporting"
            },
            "ubg": {
                "desc":"Requires universal background checks on all firearms including by private sellers.",
                "rating":"GOOD",
                "name":"Universal background checks"
            },
            "ubg, record": {
                "desc":"Requires universal background checks on all firearms and imposes other record keeping or reporting requirements.",
                "rating":"GREAT",
                "name":"Universal background checks + other regs"
            },
            "vbg": {
                "desc":"Voluntary background checks by private sellers.",
                "rating":"NONE", // This could be GOOD, but its so much weaker than the others. Up to you. -JM
                "name":"Voluntary background checks by sellers"
            }
        },
        "rregistration": {
            "name":"Rifle Registration",
            "n": {
                "desc":"Registration is not required or law is unclear",
                "rating":"BAD", 
                "name":"Not required or unclear"
            },
            "prohibit": {
                "desc":"Registration is prohibited",
                "rating":"AWFUL",
                "name":"Prohibited"
            },
            "record": {
                "desc":"A less formal record is kept",
                "rating":"GOOD", 
                "name":"Informal record"
            },
            "y": {
                "desc":"Registration is required",
                "rating":"GREAT", 
                "name":"Required"
            }
        },
        "standgroundlaw": {
            "name":"Stand Your Ground Laws",
            "common": {
                "desc":"Weaker self-defense law defined through a combination of case law, jury decisions and statutes.",
                "rating":"BAD", //should this be GOOD? Since stand your ground laws are self defense laws I think its still bad
                "name":"Weaker self-defense laws"
            },
            "n": {
                "desc":"No law, the law is unclear or is prohibited",
                "rating":"NONE", //should this be BAD? See above
                "name":"No law, unclear or prohibited"
            },
            "y": {
                "desc":"Law permits deadly force in public places with no duty to retreat.",
                "rating":"AWFUL",
                "name":"Deadly force permitted"
            },
            "yv":{
                "desc":"Law permits deadly force while in a vehicle with no duty to retreat.",
                "rating":"AWFUL",
                "name":"Deadly force permitted, including in vehicles"
            }
        },
        "smartgunlaws": {
                "name":"SmartGunLaw.org Score",
                "all": {
                        "name":"SmartGunLaw.org Score"
                }
        }
    }

