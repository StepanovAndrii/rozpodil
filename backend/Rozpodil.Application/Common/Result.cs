namespace Rozpodil.Application.Common
{
    public record Result
    {
        public bool Success { get; init; }
        protected Result(bool success) => Success = success;
        public static Result Ok() => new(true);
        public static Result Fail() => new(false);
    }

    public record Result<TError> : Result
    {
        public TError? Error { get; init; }

        protected Result(bool success, TError? error)
            : base(success)
        {
            Error = error;
        }

        public static Result<TError> Ok() => new(true, default);
        public static Result<TError> Fail(TError error) => new(false, error);
    }

    public record Result<TData, TError> : Result<TError>
    {
        public TData? Data { get; init; }

        private Result(bool success, TData? data, TError? error)
            : base(success, error)
        {
            Data = data;
        }

        public static Result<TData, TError> Ok(TData data) => new(true, data, default);
        public static Result<TData, TError> Fail(TError error) => new(false, default, error);
    }
}
