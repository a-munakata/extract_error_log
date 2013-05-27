# 現在のパスを格納
path=`pwd`

# scpしたファイルの日付と整合性が合わなかった↓
dirname=`env TZ=JST+15 date +%Y%m%d`

mkdir -p $path/$dirname/staging/export | mkdir -p $path/$dirname/production/export

# staging
scp $STAGING_LOG $path/$dirname/staging
scp $STAGING_LOG_NGINX $path/$dirname/staging

# production
scp $PRODUCTION_LOG $path/$dirname/production
scp $PRODUCTION_LOG_NGINX $path/$dirname/production

# 解凍
find . -name '*.gz' -print | xargs gzip -d
cat  $path/$dirname/production/production.log-* >> $path/$dirname/production/export/concat-production.log-$dirname
cat  $path/$dirname/staging/staging.log-* >> $path/$dirname/staging/export/concat-staging.log-$dirname

#node.jsを実行
# node $path/regexp.js

# レポートをコピー
# !!!ここはローカルのnginxのパスにする
# mkdir -p $path/-REPORTS/$dirname/production | mkdir -p $path/-REPORTS/$dirname/staging
# cp -a $path/$dirname/production/export $path/-REPORTS/$dirname/production/
# cp -a $path/$dirname/staging/export $path/-REPORTS/$dirname/staging/


