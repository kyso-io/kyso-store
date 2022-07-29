export STORE_ENV_PATH=$PWD/test/test-env
echo "==========================================="
echo "docker network create ktest"
echo "==========================================="
docker network create ktest
echo "==========================================="
echo "docker run -d -e MONGO_INITDB_ROOT_USERNAME=kadmin -e MONGO_INITDB_ROOT_PASSWORD=ksecret --network=ktest --name mongo-test mongo:latest"
echo "==========================================="
docker run -d -e MONGO_INITDB_ROOT_USERNAME=kadmin -e MONGO_INITDB_ROOT_PASSWORD=ksecret --network=ktest --name mongo-test mongo:latest
sleep 15
echo "==========================================="
echo "docker login registry.kyso.io --username francisco --password ########"
echo "==========================================="
docker login registry.kyso.io --username francisco --password CGyUeERRzr_f9hze_Qr2
echo "==========================================="
echo "docker run -v $STORE_ENV_PATH:/secrets/kyso-api/env -p 4000:4000 --network=ktest -e DOTENV_FILE=/secrets/kyso-api/env --name kyso-test-api registry.kyso.io/kyso-io/kyso-api/develop:latest &"
echo "==========================================="
docker run -v $STORE_ENV_PATH:/secrets/kyso-api/env -p 4000:4000 --network=ktest -e DOTENV_FILE=/secrets/kyso-api/env --name kyso-test-api registry.kyso.io/kyso-io/kyso-api/develop:latest &
sleep 60
echo "==========================================="
echo "npm install"
echo "==========================================="
npm install
echo "==========================================="
echo "KYSO_API=http://localhost:4000/api/v1 npm run test"
echo "==========================================="
KYSO_API=http://localhost:4000/api/v1 npm run test
echo "==========================================="
echo "Cleaning up"
echo "==========================================="
docker rm mongo-test --force
docker rm kyso-test-api --force