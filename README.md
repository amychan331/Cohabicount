## Use Azure app service editor

1. make code change in the online editor

Your code changes go live as the code changes are saved.

## Use Visual Studio Code

### Build and debug
1. download source code zip and extract source in local folder
2. open the source folder in  Visual Studio Code
3. make code changes
4. download and run [botframework-emulator](https://emulator.botframework.com/)
5. connect the emulator to http://localhost:3987

### Publish back

```
npm run azure-publish
```

### Troubleshoot
* When running npm run azure-publish, I get "TypeError [ERR_INVALID_CALLBACK]: Callback must be a function" in fs.js.
One of the fs method is createReadStream(), used in publish.js to opens a file stream for reading. This error mostly shows up because of lacking owner permission. Depending on your OS, change the user of the files in your directory to either \_www(Mac/Linux) or data-www(Window).

## Use continuous integration

If you have setup continuous integration, then your bot will automatically deployed when new changes are pushed to the source repository.

## Sample
<kbd>![Cohabicount in Slack](https://github.com/amychan331/Cohabicount/blob/master/statics/images/Cohabicount_Demo.gif)</kbd>