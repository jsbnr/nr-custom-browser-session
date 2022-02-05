# New Relic Custom Session Snippet

Generates and manages a custom session token reporting to New Relic via custom attributes.

Data recorded includes session ID, session duration and page views. It can be queried like this (assuming a token name of 'NRsess'):

`SELECT pageUrl,NRsess, NRsessDuration/1000 as 'seconds', NRsessPV   from PageView`

## Usage
Add the snippet into the HEAD tag immediately after the New Relic browser snippet. 
- Set the `cName` to the cookie name of your choice.
- Set the `cAge` to the number of seconds the session can be idle (no page views) before it resets. 