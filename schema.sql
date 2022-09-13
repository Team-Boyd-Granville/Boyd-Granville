DROP TABLE IF EXISTS Users, Repositories, Commits, FollowReferences;

CREATE TABLE IF NOT EXISTS Users (
    UserID int NOT NULL PRIMARY KEY,
    FirstName varchar(255),
    LastName varchar(255),
    email varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Commits (
    CommitID int NOT NULL PRIMARY KEY,
    AuthorID int NOT NULL,
    commitdate DATE NOT NULL,
    commitmessage varchar(255),
    branch varchar(255),
    FOREIGN KEY (AuthorID) REFERENCES Users(UserID)
    
);

CREATE TABLE IF NOT EXISTS Repositories (
    RepoID int NOT NULL PRIMARY KEY,
    name varchar(255),
    LastCommit int,
    FOREIGN KEY (LastCommit) REFERENCES Commits(CommitID) 
);

CREATE TABLE IF NOT EXISTS FollowReferences (
    FollowID int NOT NULL PRIMARY KEY,
    UserID int NOT NULL,
    RepositoryID int NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (RepositoryID) REFERENCES Repositories(RepoID)        
);