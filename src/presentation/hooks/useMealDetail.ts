import { useState, useCallback, useMemo } from 'react';
import { MealDetailState, MealDetailViewModel } from '../viewModels/MealDetailViewModel';
import { GetMealDetailUseCaseImpl } from '@/application/useCases/GetMealDetailUseCaseImpl';
import { MealRepository } from '@/infrastructure/repositories/MealRepository';

export const useMealDetail = (id: string) => {
    const [state, setState] = useState<MealDetailState>({
        meal: null,
        isLoading: true,
        error: null
    });

    const setPartialState = useCallback((newState: Partial<MealDetailState>) => {
        setState(prevState => ({ ...prevState, ...newState }));
    }, []);

    const repository = useMemo(() => new MealRepository(), []);
    const viewModel = useMemo(() => new MealDetailViewModel(
        new GetMealDetailUseCaseImpl(repository),
        setPartialState
    ), [repository, setPartialState]);

    const loadMealDetail = useCallback(() => {
        viewModel.loadMealDetail(id);
    }, [viewModel, id]);

    return {
        ...state,
        loadMealDetail
    };
}; 