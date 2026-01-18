// Literature Types
export type LiteratureType = 'puisi' | 'pantun' | 'cerpen' | 'gurindam' | 'syair' | 'prosa';

// Style Types
export type WritingStyle = 'klasik' | 'modern' | 'kontemporer';

// Mood Types
export type Mood = 'romantis' | 'melankolis' | 'gembira' | 'inspiratif' | 'filosofis';

// User Types
export interface User {
    id: string;
    email: string;
    fullName?: string;
    username?: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: Date;
    totalWorks: number;
    totalBookmarks: number;
    subscriptionTier: 'free' | 'premium' | 'pro';
}

// Literature Work
export interface LiteratureWork {
    id: string;
    userId: string;
    title: string;
    content: string;
    excerpt?: string;
    literatureType: LiteratureType;
    theme?: string;
    style?: WritingStyle;
    mood?: Mood;
    tags: string[];
    aiModel?: string;
    generationPrompt?: string;
    viewCount: number;
    bookmarkCount: number;
    commentCount: number;
    averageRating: number;
    isPublic: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    author?: {
        username: string;
        avatarUrl?: string;
    };
}

// Learning Module
export interface LearningModule {
    id: string;
    title: string;
    description: string;
    literatureType: LiteratureType;
    difficulty: 'pemula' | 'menengah' | 'lanjut';
    content: {
        introduction: string;
        characteristics: string[];
        structure: string;
        examples: LiteratureExample[];
        tips: string[];
    };
    quizQuestions?: QuizQuestion[];
    estimatedMinutes: number;
}

// Literature Example
export interface LiteratureExample {
    id: string;
    title: string;
    author: string;
    content: string;
    year?: number;
    notes?: string;
}

// Quiz Question
export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

// Learning Progress
export interface LearningProgress {
    id: string;
    userId: string;
    moduleId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    progressPercentage: number;
    score?: number;
    startedAt?: Date;
    completedAt?: Date;
}

// Bookmark
export interface Bookmark {
    id: string;
    userId: string;
    workId: string;
    folder: string;
    notes?: string;
    createdAt: Date;
    work?: LiteratureWork;
}

// Comment
export interface Comment {
    id: string;
    workId: string;
    userId: string;
    content: string;
    parentId?: string;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
    author?: {
        username: string;
        avatarUrl?: string;
    };
}

// Rating
export interface Rating {
    id: string;
    workId: string;
    userId: string;
    rating: number;
    review?: string;
    createdAt: Date;
}

// Generation Request
export interface GenerationRequest {
    literatureType: LiteratureType;
    theme: string;
    style: WritingStyle;
    mood: Mood;
    length: 'short' | 'medium' | 'long';
    additionalInstructions?: string;
}

// Generation Response
export interface GenerationResponse {
    success: boolean;
    content?: string;
    title?: string;
    error?: string;
    tokensUsed?: number;
}

// Timeline Event (for history)
export interface TimelineEvent {
    id: string;
    era: string;
    year: string;
    title: string;
    description: string;
    literatureTypes: LiteratureType[];
    keyFigures?: string[];
}

// Literature Info for Learning Hub
export interface LiteratureInfo {
    type: LiteratureType;
    name: string;
    description: string;
    icon: string;
    characteristics: string[];
    structure: string;
    examples: {
        title: string;
        author: string;
        content: string;
    }[];
}
