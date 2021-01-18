import graphene

from game.models import Deck



class DeleteDeck(graphene.Mutation):
    delete_success = graphene.Boolean()

    class Arguments:
        deck_id = graphene.Int()

    class Meta:
        description = "Delete a deck."

    def mutate(self, info, deck_id):
        try:
            deck = Deck.objects.get(id=deck_id)
            if deck.user.id != info.context.user.id:
                raise Exception("Deck doesn't belong to user.")
            deck.delete()
        except:
            return DeleteDeck(delete_success=False)

        return DeleteDeck(delete_success=True)
