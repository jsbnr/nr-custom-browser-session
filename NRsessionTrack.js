<script type="application/javascript">
    if (typeof newrelic == 'object' && crypto && crypto.subtle && crypto.subtle.digest) {
        
        const cName="NRsess"    // Name of your session cookie
        const cAge=60*60        //Seconds session lasts until its reset

        let cookies=document.cookie.split(';').reduce((cookies, cookie) => {
            const [ name, value ] = cookie.split('=').map(c => c.trim())
            return { ...cookies, [name]: value }
        }, {});
        async function digestMessage(message) {
            const msgUint8 = new TextEncoder().encode(message)
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
            return hashHex
        }
        if(cookies[cName]) {
            console.log("existing cookie"+cookies[cName])
            const cookieData=cookies[cName].split('|')
            const pages=cookieData[2] ? parseInt(cookieData[2]) + 1 : 0
            const duration=cookieData[1] ? Date.now()-parseInt(cookieData[1]) : 0
            document.cookie = cName+"="+cookieData[0]+"|"+cookieData[1]+"|"+pages+"; path=/;max-age="+cAge
            newrelic.setCustomAttribute(cName, cookieData[0])
            newrelic.setCustomAttribute(cName+"PV", pages)
            newrelic.setCustomAttribute(cName+"Duration", duration)
        } else {
            console.log("new cookie")
            const sessionID=Math.random()+"-"+Date.now()
            digestMessage(sessionID)
            .then(function (digestHex) {
                document.cookie = cName+"="+digestHex+"|"+Date.now()+"|0; path=/;max-age="+cAge
                newrelic.setCustomAttribute(cname, digestHex)
                newrelic.setCustomAttribute(cName+"PV", 1)
                newrelic.setCustomAttribute(cName+"Duration", 0)
            })
        }
    }
</script>