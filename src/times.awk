tr -s '\r\n' '\n' < rh.tsv | awk -F '\t' '
BEGIN       {
                current = "";
                pagebreak = 0
                print "{";
             }
$2 != ""    { prev=section; section=$2; gsub("\"","@",section); }
$4 == ""    { pagebreak = 1; }
$4          {
                if (!current) {
                    gsub("\"","@",prev)
                    print " \"BANNER\" : { \"PARSHA\" : \"" prev "\"},"
                    print " \"pages\" : ["
                    print "   { \"sections\": ["
                }
                if (section != current) {
                    if (current) {
                        if (pagebreak == 1) {
                            print "    ]}]},{ \"sections\": [";
                        } else {
                            print "   ]},";
                        }
                    }
                    pagebreak = 0;
                    print "   { \"title\": \"" section "\", \"items\": [";
                    current = section;
                } else {
                    print "  ,"
                }
                gsub("\"","@",$3)
                gsub("\"","@",$4)
                print "   {\"time\": \"" $4 "\", ";
                if (match($3, /\(.*\)\s*/)) {
                    print "    \"comment\": \"" substr($3, RSTART, RLENGTH) "\","
                    print "    \"title\": \"" substr($3, 1, RSTART-2) "\""
                } else {
                    print "    \"comment\": \"\","
                    print "    \"title\": \"" $3 "\""
                }
                print "   }";
            }
END         {
                print "   ]}]}";
                print "  ]";
                print "}";
            }
'
