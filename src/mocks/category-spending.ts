export type CategorySpending = {
    id: string;
    name: string;
    amount: number; // em reais
};

export const MOCK_CATEGORY_SPENDING: CategorySpending[] = [
    { id: "housing", name: "Moradia", amount: 2920.0 },
    { id: "groceries", name: "Mercado", amount: 1318.4 },
    { id: "transport", name: "Transporte", amount: 684.2 },
    { id: "leisure", name: "Lazer", amount: 541.3 },
    { id: "health", name: "Saúde", amount: 392.1 },
    { id: "subscriptions", name: "Assinaturas", amount: 239.8 },
    { id: "restaurants", name: "Restaurantes", amount: 187.5 },
    { id: "education", name: "Educação", amount: 0 },
];