rm -rf src/main/resources/db
rm -rf deploy/src
xcopy src deploy\src\ /s /e
xcopy pom.xml deploy /y
cd deploy
git add .
git status
pause
git commit -m "Automatic commit"
git push -u origin master
pause