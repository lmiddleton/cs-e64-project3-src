var gun_key = {
        "alcoholserved": {
            "name":"Establishments Serving Alcohol",
            "allowed":{
                "desc":"No specific regulation banning firearms at establishments serving alcohol.",
                "rating":"NONE",
                "name":"No ban"
            },
            "ban":{
                "desc":"Prohibits firearms at establishments serving alcohol.",
                "rating":"GREAT",
                "name":"Banned"
            },
            "partial ban": {
                "desc":"Prohibits firearms at most establishments serving alcohol, but may allow in certain circumstances where consuming alcohol is not the main purpose of business.",
                "rating":"GOOD",
                "name":"Partial Ban"
            }
        },
        "arenas": {
            "name":"Arenas",
            "allowed": {
                "desc":"No specific regulation or law is unclear.",
                "rating":"NONE",
                "name":"No specific regulation"
            },
            "ban": {
                "desc":"Prohibits firearms at sporting arenas or events.",
                "rating":"GREAT",
                "name":"Prohibited"
            },
            "unclear": {
                "desc":"The law is unclear.",
                "rating":"UNCLEAR",
                "name":"Law is unclear"
            }
            
        },
        "churches": {
            "name":"Places of Worship",
            "allowed": {
                "desc":"No specific regulation",
                "rating":"NONE",
                "name":"No specfic regulation"
            },
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
            "unclear": {
                "desc":"The law is unclear.",
                "rating":"UNCLEAR",
                "name":"Unclear"
            }
        },
        "concealedtype": {
            "name":"Concealed Handguns",
            "may issue": {
                "desc":"Permit to carry a concealed handgun is issued if permit requirements are met, but is also up to the discretion of local authorities.",
                "rating":"BAD",
                "name":"Permits issued on requirements and authority discretion"
            },
            "no issue": {
                "desc":"Does not allow a private citizen to carry a concealed handgun in public.",
                "rating":"GOOD",
                "name":"Not allowed"
            },
            "prohibited": {
                "desc":"Private citizens are prohibited from carrying a concealed handgun in public.",
                "rating":"GREAT",
                "name":"Prohibited"
            },
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
            "gsbg": {
                "desc":"Requires background checks during the sale of all firearms at gun shows.",
                "rating":"GREAT",
                "name":"Background check required"
            },
            "no regulation": {
                "desc":"No specific regulation or the law is unclear",
                "rating":"NONE",
                "name":"No regulation"
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
            "other regulation, ubg": {
                "desc":"Requires background checks during the sale of all firearms including at gun shows and imposes other regulations.",
                "ratings":"GREAT",
                "name":"Background checks and other restrictions"
            },
            "ubg": {
                "desc":"Requires background checks during the sale of all firearms including at gun shows.",
                "ratings":"GREAT",
                "name":"Background checks required"
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
                "name":"Prohibited"
            },
            "descretion": {
                "desc":"Left to the discretion of college administrators.",
                "rating":"NONE",
                "name":"Discretion of administrators"
            }
        },
        "hownerlicense": {
            "name":"Hand Gun Permits",
            "both": {
                "desc":"Permit and license regulations apply.",
                "rating":"GREAT",
                "name":"Permit and license required"
            },
            "license": {
                "desc":"A permit or license is required.",
                "rating":"GOOD",
                "name":"License required"
            },
            "n": {
                "desc":"No regulation or law is unclear.",
                "rating":"NONE",
                "name":"No regulation or law is unclear"
            },
            "permit": {
                "desc":"A permit or license is required.",
                "rating":"GOOD",
                "name":"Permit required"
            },
            "y": {
                "desc":"A permit or license is required.",
                "rating":"GOOD",
                "name":"Permit or license required"
            }
        },
        "hospitals": {
            "name":"Firearms in Hospitals",
            "allowed": {
                "desc":"No specific regulation or law is unclear.",
                "rating":"NONE",
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
                "rating":"UNCLEAR",
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
                "rating":"BAD",
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
                "rating":"GREAT",
                "name":"Permit and license required"
            },
            "license": {
                "desc":"A license is required.",
                "rating":"GOOD",
                "name":"License required"
            },
            "n": {
                "desc":"No regulation or law is unclear.",
                "rating":"NONE",
                "name":"No regulation"
            },
            "permit": {
                "desc":"A permit is required.",
                "rating":"GOOD",
                "name":"Permit required"
            },
            "y": {
                "desc":"A permit or license is required.",
                "rating":"GOOD",
                "name":"Permit or license required"
            }
        },
        "loststolen": {
            "name":"Lost or Stolen Firearms",
            "civil liability": {
                "desc":"Owner is not liable in case when a crime is committed with the gun if the owner has reported the gun is missing",
                "rating":"GREAT",
                "name":"Owner liable if reported missing"
            },
            "no regulation": {
                "desc":"No regulation",
                "rating":"NONE",
                "name":"No regulation"
            },
            "regulation": {
                "desc":"Requires reporting lost or stolen guns",
                "rating":"GOOD",
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
                "rating":"GOOD",
                "name":"Prohibited"
            }
        },
        "opencarrylongguns": {
            "name":"Openly Carried Longguns",
            "allow": {
                "desc":"Allows open carrying of long guns without permit or license.",
                "rating":"NONE",
                "name":"Allowed"
            },
            "prohibit": {
                "desc":"Prohibits open carrying of long guns.",
                "rating":"GREAT"
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
                "name":"Universal background checks and other regulations"
            },
            "vbg": "Voluntary background checks by private sellers."
        },
        "rregistration": {
            "name":"Rifle Registration",
            "n": {
                "desc":"Registration is not required or law is unclear",
                "rating":"UNCLEAR",
                "name":"Not required or unclear"
            },
            "prohibit": {
                "desc":"Registration is prohibited",
                "rating":"AWFUL",
                "name":"Prohibited"
            },
            "record": {
                "desc":"A less formal record is kept",
                "rating":"BAD",
                "name":"Informal record"
            },
            "y": {
                "desc":"Registration is required",
                "rating":"GOOD",
                "name":"required"
            }
        },
        "standgroundlaw": {
            "name":"Stand Your Ground Laws",
            "common": {
                "desc":"Weaker self-defense law defined through a combination of case law, jury decisions and statutes.",
                "rating":"BAD",
                "name":"Weaker self-defense laws"
            },
            "n": {
                "desc":"No law, the law is unclear or is prohibited",
                "rating":"NONE",
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

