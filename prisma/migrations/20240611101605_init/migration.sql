BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Contact] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Contact_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [first] NVARCHAR(1000),
    [last] NVARCHAR(1000),
    [avatar] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [twitter] NVARCHAR(1000),
    [favorite] BIT NOT NULL CONSTRAINT [Contact_favorite_df] DEFAULT 0,
    [notes] NVARCHAR(1000),
    CONSTRAINT [Contact_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
