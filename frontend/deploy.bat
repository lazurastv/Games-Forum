rm -rf deploy/static
rm -rf build
start npm run build
xcopy build deploy /s /e /y
cd deploy
git add .
git status
pause
git commit -m "Automatic commit"
git push -u origin master
pause