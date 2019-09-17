tr -s '\r\n' '\n' < rh.tsv | awk -F '\t' '
BEGIN       {
                current = "";
                print "{";
             }
$2          { prev=section; section=$2; }
$4          {
                if (!current) {
                    print " \"BANNER\": { \"PARSHA\": \"" prev "\"},"
                    print " \"PAGES\": ["
                    print "  \"SECTIONS\": ["
                }
                if (section != current) {
                    if (current) print "   ]},";
                    print "   { \"title\": \"" section "\", \"ITEMS\": [";
                    current = section;
                } else {
                    print "  ,"
                }
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
                print "   ]}";
                print "  ]";
                print " ]";
                print "}";
            }
'
