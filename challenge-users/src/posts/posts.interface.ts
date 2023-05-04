export interface Posts {
  id: string;
  title: string;
  body: string;
}

export interface CreatedPosts extends Omit<Posts, 'id'> {}

export interface UpdatedPosts extends Omit<Partial<Posts>, 'id'> {}
