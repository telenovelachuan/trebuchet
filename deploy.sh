echo "Start deploying to server"
echo "Swapping env files..."
mv .env .env.tmp
mv .env.prod .env

echo "Building React packages..."
npm run-script build
echo "Uploading packages to server..."
#scp -r build/* xlg6flseyzv1@107.180.0.210:~/public_html/
scp -r build/* chuansun@gator4307.hostgator.com:~/public_html/
scp -r .env chuansun@gator4307.hostgator.com:~/git/trebuchet

echo "Recovering env files..."
mv .env .env.prod
mv .env.tmp .env
echo "Done!"
