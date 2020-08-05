#!/bin/bash

API="http://localhost:4741"
URL_PATH="/projects"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "project": {
      "name": "'"${NAME}"'",
      "description": "'"${DESC}"'",
      "budget": "'"${BUDGET}"'",
      "spent": "'"${SPENT}"'"
    }
  }'

echo
