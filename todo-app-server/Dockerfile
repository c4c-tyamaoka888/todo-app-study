# ビルドステージ
FROM eclipse-temurin:25-jdk AS builder

WORKDIR /app

# Gradle Wrapperをコピー
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# 実行権限を付与
RUN chmod +x ./gradlew

# 依存関係をダウンロード（キャッシュ効率化）
RUN ./gradlew dependencies --no-daemon || true

# ソースコードをコピー
COPY src src

# ビルド
RUN ./gradlew bootJar --no-daemon

# 実行ステージ
FROM eclipse-temurin:25-jre

WORKDIR /app

# ビルド成果物をコピー
COPY --from=builder /app/build/libs/*.jar app.jar

# ポート公開
EXPOSE 8080

# デバッグポート公開
EXPOSE 5005

# 起動コマンド（デバッグ用JVMオプション付き）
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "app.jar"]
