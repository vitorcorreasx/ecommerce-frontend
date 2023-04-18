const getCardBalance = `
  query Query($cardInfos: CardInput) {
    getCard(cardInfos: $cardInfos) {
      balance
    }
  }
`;

export { getCardBalance };