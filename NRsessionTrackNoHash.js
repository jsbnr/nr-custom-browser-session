<script type="application/javascript">
    if (typeof newrelic == 'object') {

        const cName="NRsess"    // Name of your session cookie
        const cAge=60*60        //Seconds session lasts until its reset

        const cAgeString=cAge > 0 ? "; path=/;max-age="+cAge : ""
        let cookies=document.cookie.split(';').reduce((cookies, cookie) => {
            const [ name, value ] = cookie.split('=').map(c => c.trim())
            return { ...cookies, [name]: value }
        }, {});
        if(cookies[cName]) {
            const cookieData=cookies[cName].split('|')
            const pages=cookieData[2] ? parseInt(cookieData[2]) + 1 : 0
            const duration=cookieData[1] ? Date.now()-parseInt(cookieData[1]) : 0
            document.cookie = cName+"="+cookieData[0]+"|"+cookieData[1]+"|"+pages+"; path=/"+cAgeString
            newrelic.setCustomAttribute(cName, cookieData[0]+"|"+cookieData[1])
            newrelic.setCustomAttribute(cName+"PV", pages)
            newrelic.setCustomAttribute(cName+"Duration", duration)
        } else {
            const sessionID=(Math.random()+"|").replace("0.","")+Date.now() //Or add your own pre-existing session ID here
            document.cookie = cName+"="+sessionID+"|0; path=/"+cAgeString
            newrelic.setCustomAttribute(cName, sessionID)
            newrelic.setCustomAttribute(cName+"PV", 1)
            newrelic.setCustomAttribute(cName+"Duration", 0)
        
        }
    }
</script>