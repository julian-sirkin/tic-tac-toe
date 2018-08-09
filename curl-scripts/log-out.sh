curl "https://aqueous-atoll-85096.herokuapp.com/sign-out" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --token '{
    "token": "'"${TOKEN}"'"
  }'

echo
