export interface AIServiceInterface {
    analyzeIntent(input: string): Promise<{
        intent: string;
        confidence: number;
        suggestedDepartment: string;
    }>;
}
