if [ ! -z ${ACCESS_TOKEN_AUTOMATIC_TESTING+y} ]; then 
  if [ ! -z ${ACCESS_TOKEN_AUTOMATIC_TESTING_USERNAME+y} ]; then 
    echo "Setted variables"
    #cp -R coverage ./test-results
    return
    TITLE="Kyso Store Automatic Test Results "`date '+%F %H:%M:%S'`
    echo "Creating report..."
    npx kyso login --provider kyso --kysoInstallUrl https://kyso.io --username $ACCESS_TOKEN_AUTOMATIC_TESTING_USERNAME --token $ACCESS_TOKEN_AUTOMATIC_TESTING
    echo "Creating kyso.yaml file"
    sed -i 's/#TITLE/'"$TITLE"'/g' template-kyso.yaml
    cp template-kyso.yaml ./test-results/kyso.yaml
    echo "Uploading report to Kyso.io"
    npx kyso push --path ./test-results --inlineComments n
  else 
    echo "Variable ACCESS_TOKEN_AUTOMATIC_TESTING_USERNAME is not set"
  fi
else
  echo "Variable ACCESS_TOKEN_AUTOMATIC_TESTING is not set"
fi
