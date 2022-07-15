const fastify = require('fastify');
const app = fastify();
const { Engine } = require('json-rules-engine');

const validateACode = async (code) => {
  let engine = new Engine();

  engine.addRule({
    conditions: {
      any: [
        {
          all: [
            {
              fact: 'notATestCode',
              operator: 'equal',
              value: false,
            },
            {
              fact: 'theClientIsEnabled',
              operator: 'equal',
              value: true,
            },
            {
              fact: 'promotionIsRunning',
              operator: 'equal',
              value: true,
            },
            {
              fact: 'totalNumberOfSwapsNotExceeded',
              operator: 'equal',
              value: true,
            },
            {
              fact: 'clientDidNotExceedTheNumberOfSwapsPerPromotion',
              operator: 'equal',
              value: true,
            },
            {
              fact: 'clientDidNotExceedTheNumberOfSwapsPerPromotionOnTheDay',
              operator: 'equal',
              value: true,
            },
          ],
        },
      ],
    },
    event: {
      // define the event to fire when the conditions evaluate truthy
      type: 'validCode',
      params: {
        message: 'Code is valid',
      },
    },
  });

  /**
   * Define facts the engine will use to evaluate the conditions above.
   */
  let facts = {
    notATestCode: false,
    theClientIsEnabled: true,
    promotionIsRunning: true,
    totalNumberOfSwapsNotExceeded: true,
    clientDidNotExceedTheNumberOfSwapsPerPromotion: true,
    clientDidNotExceedTheNumberOfSwapsPerPromotionOnTheDay: true,
  };

  const { events } = await engine.run(facts);

  console.log(events[0].params.message);
};

validateACode();

app.listen(8080);
