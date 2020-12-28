import graphene
from django.test.testcases import TestCase

from uplifty.graphql.schema import Query


class GraphqlEnpointTest(TestCase):
    def test_me(self):
        schema = graphene.Schema(query=Query)
        result = schema.execute(
            """
                query {
                me {
                    email
                    username
                }
                }
            """
        )
        self.assertIsNone(result.errors)
        self.assertDictEqual({"reporter": {"id": "1"}}, result.data)
