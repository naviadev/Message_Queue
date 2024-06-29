node ./server/dist/utility/updatePort.js
echo "Starting Next.js server..."
cd ./client
npm run start &
cd ..
echo "Starting Express server..."
npm run express &
echo "All servers are running."

