
## List of Required Software
- Windows 7
- .NET 3.5 (Enable Program and Features)
- Visual Studio 2008 Pro 
  - Has to been 2008 because 2008 is the last year that supports .NET Compact Framework
    - May also be possible in 2005 but good luck with that
  - You need pro becuase Smart Device projects are only avilable in Pro
  - If you don't install PRO, the installation will fail and you'll get some of the files but not all of them
  - Link here: http://download.microsoft.com/download/8/1/d/81d3f35e-fa03-485b-953b-ff952e402520/VS2008ProEdition90dayTrialENUX1435622.iso
- Windows Mobile 6.5 Developer Tool Kit
  - https://www.microsoft.com/en-ca/download/confirmation.aspx?id=17284
  - Dunno why we need this, but it's part of the prerequeistes in the readme file
- Microsoft Windows Mobile Device Center 6.1 Driver for Windows Vista (64-bit)
  - Also not sure if this is needed, but it's mentioned in the readme file
  - It says Windows Vista, but it works on Windows 7 too
  - https://www.microsoft.com/en-ca/download/confirmation.aspx?id=3182
- Motorola EMDK
  - Zebra Technologies aquired Motorola Solutions Enterprise Business in October 2014, but they still maintain a download link for the .NET EMDK which can be found here: https://www.zebra.com/us/en/support-downloads/software/developer-tools/emdk-for-net.html
  
## Possible Errors
### While Installing the EMDK
- Visual Studio 2008 Not Found. **Fix:** Install Visual Studio 2008 Pro
- Failed to install for Visual Studio 2008. **Fix:** Make sure the PRO version is installed, not express or standard
- You can contribute to this list by opening a PR in github
