import { Case } from '../../../../types/components/Case'
import { CaseFilters } from './CaseFilters'

export interface CaseState {
    chassis: Case | null
    setChassis: React.Dispatch<React.SetStateAction<Case | null>>
    chassisFilters: CaseFilters
}
