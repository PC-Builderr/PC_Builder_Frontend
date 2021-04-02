import { Case } from '../../../../types/components/Case'
import { CaseFilters } from './CaseFilters'

export interface CaseState {
    setChassis: React.Dispatch<React.SetStateAction<Case | null>>
    chassisFilters: CaseFilters
    chassis: Case | null
}
