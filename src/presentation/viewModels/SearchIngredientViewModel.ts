import { Ingredient } from '@/domain/entities';
import { GetAllIngredientsUseCase, SearchIngredientsUseCase } from '@/domain/useCases/SearchIngredientsUseCase';

export interface SearchIngredientState {
    ingredients: Ingredient[];
    isLoading: boolean;
    error: string | null;
    searchResults: Ingredient[];
}

export class SearchIngredientViewModel {
    constructor(
        private getAllIngredientsUseCase: GetAllIngredientsUseCase,
        private searchIngredientsUseCase: SearchIngredientsUseCase,
        private setState: (state: Partial<SearchIngredientState>) => void
    ) {}

    async loadIngredients(): Promise<void> {
        try {
            this.setState({ isLoading: true, error: null });
            const ingredients = await this.getAllIngredientsUseCase.execute();
            this.setState({ ingredients, isLoading: false });
        } catch (error) {
            this.setState({ 
                error: error instanceof Error ? error.message : 'An error occurred',
                isLoading: false 
            });
        }
    }

    async searchIngredients(query: string): Promise<void> {
        try {
            const results = await this.searchIngredientsUseCase.execute(query);
            this.setState({ searchResults: results, error: null });
        } catch (error) {
            this.setState({ 
                error: error instanceof Error ? error.message : 'An error occurred',
                searchResults: [] 
            });
        }
    }
} 