# New Relic Custom Session Snippet

Generates and manages a custom session token reporting to New Relic via custom attributes. Session ID is hash encoded.

Data recorded includes session ID, session duration and page views. It can be queried like this (assuming a token name of 'NRsess'):

`SELECT pageUrl,NRsess, NRsessDuration/1000 as 'seconds', NRsessPV   from PageView`

There are two versions of the scrip, one that SHA-256 hashes and obfuscates the sesion ID and one that does not.

- `NRSessionTRack.js` - Uses `crypto` for data hashing
- `NRsessionTrackNoHash.js` - Does not hash session and does ot usee `crypto`

## Data Hashing
The session ID is SHA-156 hashed to obfuscate it. This relies on the `crypto` feature which may only available in secure contexts (HTTPS). Check browser support [here](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#browser_compatibility).

Hashing is recommended if you suppply your own session ID that is attributable back to a person and you want to be PII compliant. If you're generating a unique random session then this is not so relevant.

## Usage
Choose which version you wish to use and add the snippet into the HEAD tag immediately after the New Relic browser snippet. 
- Set the `cName` to the cookie name of your choice.
- Set the `cAge` to the number of seconds the session can be idle (no page views) before it resets.  If set to zero no age will be set and a default browser session cookie will be used.
- The `sessionID` ss generated using a random number and timestamp. If you have your own session ID available set it here instead.