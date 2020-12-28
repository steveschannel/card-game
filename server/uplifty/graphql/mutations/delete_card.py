import graphene

from game.models import Card



class DeleteCard(graphene.Mutation):
    delete_success = graphene.Boolean()

    class Arguments:
        card_id = graphene.Int()

    class Meta:
        description = "Delete a card."

    def mutate(self, info, card_id):
        try:
            card = Card.objects.get(id=card_id)
            if card.deck.user.id != info.context.user.id:
                raise Exception("Card doesn't belong to user.")
            card.delete()
        except:
            return DeleteCard(delete_success=False)

        return DeleteCard(delete_success=True)
