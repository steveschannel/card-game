def SetSessionVariables(session, game_id, game, deck):

    if (
        game.game_can_lose == False
        and not deck.cards.filter(dealt=False, pk=session.get("ace")).exists()
    ):
        ace_in_the_hole_id = game.active_deck.cards.filter(value="Ace").first().id
        session["ace"] = ace_in_the_hole_id

    if session.get("game") != game_id:
        unplayed_ids = deck.cards.filter(dealt=False).values_list("id", flat=True)

        if game.game_can_lose == True:
            session["unplayed"] = list(unplayed_ids)

        else:
            ace_in_the_hole_id = session["ace"]
            session["unplayed"] = list(unplayed_ids.exclude(pk=ace_in_the_hole_id))

        session["game"] = game_id
