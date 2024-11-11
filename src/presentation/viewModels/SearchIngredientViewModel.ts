import { Ingredient, Meal } from '@/domain/entities';
import { IMealRepository } from '@/domain/repositories/IMealRepository';
import { GetAllIngredientsUseCase, SearchIngredientsUseCase } from '@/domain/useCases/SearchIngredientsUseCase';

export interface SearchIngredientState {
    ingredients: Ingredient[];
    isLoading: boolean;
    error: string | null;
    searchResults: Ingredient[];
    selectedIngredient: Ingredient | null;
    meals: Meal[];
}

export class SearchIngredientViewModel {
    constructor(
        private getAllIngredientsUseCase: GetAllIngredientsUseCase,
        private searchIngredientsUseCase: SearchIngredientsUseCase,
        private repository: IMealRepository,
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

    async selectIngredient(ingredient: Ingredient): Promise<void> {
        try {
            this.setState({ 
                selectedIngredient: ingredient,
                isLoading: true,
                error: null,
                searchResults: []
            });
            
            const meals = await this.repository.getMealsByIngredient(ingredient.name);
            this.setState({ 
                meals,
                isLoading: false
            });
        } catch (error) {
            this.setState({ 
                error: error instanceof Error ? error.message : 'An error occurred',
                isLoading: false,
                meals: []
            });
        }
    }

    clearSelection(): void {
        this.setState({
            selectedIngredient: null,
            meals: [],
            searchResults: []
        });
    }
} 