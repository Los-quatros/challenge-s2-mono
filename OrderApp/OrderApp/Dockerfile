FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /OrderApp

# Copy csproj
COPY ../ .
# Restore as distinct layers
RUN dotnet restore
# Copy everything else and build
COPY ./OrderApp/ ./OrderApp/
RUN dotnet build -c Release -o /OrderApp/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /OrderApp
COPY --from=build-env ./OrderApp/out .
ENTRYPOINT ["dotnet", "OrderApp.dll"]