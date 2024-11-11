import { GetAllIngredientsUseCaseImpl } from '@/application/useCases/GetAllIngredientsUseCaseImpl';
import { SearchIngredientsUseCaseImpl } from '@/application/useCases/SearchIngredientsUseCaseImpl';
import { MealRepository } from '@/infrastructure/repositories/MealRepository';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchIngredientState, SearchIngredientViewModel } from '../viewModels/SearchIngredientViewModel';

export const useSearchIngredient = () => {
    const [state, setState] = useState<SearchIngredientState>({
        ingredients: [],
        isLoading: true,
        error: null,
        searchResults: []
    });

    const setPartialState = useCallback((newState: Partial<SearchIngredientState>) => {
        setState(prevState => ({ ...prevState, ...newState }));
    }, []);

    const repository = useMemo(() => new MealRepository(), []);
    const viewModel = useMemo(() => new SearchIngredientViewModel(
        new GetAllIngredientsUseCaseImpl(repository),
        new SearchIngredientsUseCaseImpl(repository),
        setPartialState
    ), [setPartialState, repository]);

    useEffect(() => {
        viewModel.loadIngredients();
    }, [viewModel]);

    return {
        ...state,
        searchIngredients: useCallback((query: string) => 
            viewModel.searchIngredients(query), 
        [viewModel])
    };
}; 