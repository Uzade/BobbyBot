cat > /config.json << ENDOFFILE
{
    "token": "${{ secrets.DISCORD_TOKEN }}",
    "UID": "${{ secrets.RECIPIENT_UID }}"
}
ENDOFFILE