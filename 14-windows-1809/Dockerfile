FROM mcr.microsoft.com/powershell:lts-windowsservercore-1809

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

ENV NODE_VERSION 14.17.5
ENV YARN_VERSION latest

RUN [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 ; \
    Invoke-WebRequest $('https://nodejs.org/dist/v{0}/node-v{0}-win-x64.zip' -f $env:NODE_VERSION) -OutFile 'node.zip' -UseBasicParsing ; \
    Expand-Archive node.zip -DestinationPath C:\ ; \
    Rename-Item -Path $('C:\node-v{0}-win-x64' -f $env:NODE_VERSION) -NewName 'C:\nodejs'

RUN [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 ; \
    Invoke-WebRequest $('https://classic.yarnpkg.com/{0}.msi' -f $env:YARN_VERSION) -OutFile yarn.msi -UseBasicParsing ; \
    Start-Process msiexec.exe -ArgumentList '/i', 'yarn.msi', '/quiet', '/norestart' -NoNewWindow -Wait

RUN New-Item $($env:APPDATA + '\npm') -Type Directory ; \
    $env:PATH = 'C:\nodejs;{0}\npm;C:\yarn\bin;{1}' -f $env:APPDATA, $env:PATH ; \
    [Environment]::SetEnvironmentVariable('PATH', $env:PATH, [EnvironmentVariableTarget]::Machine)

CMD ["pwsh.exe"]
