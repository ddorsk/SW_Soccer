#!/bin/bash

# 모니터링할 파일과 백업 폴더 설정
FILE_TO_MONITOR="/path/to/your/file.txt"
BACKUP_DIR="/home/leeseokhee/project/SW/sh/"

# 백업 디렉토리가 존재하지 않으면 생성
mkdir -p "$BACKUP_DIR"

# 마지막 수정 시간을 추적할 변수
LAST_MODIFIED_TIME=$(stat --format=%Y "$FILE_TO_MONITOR")

# 파일이 변경될 때마다 백업을 수행하는 루프
while true; do
    # 현재 파일의 마지막 수정 시간 확인
    CURRENT_MODIFIED_TIME=$(stat --format=%Y "$FILE_TO_MONITOR")
    
    # 파일이 변경되었으면 백업 수행
    if [[ "$CURRENT_MODIFIED_TIME" -ne "$LAST_MODIFIED_TIME" ]]; then
        # 타임스탬프 생성 (형식: YYYYMMDD_HHMMSS)
        TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
        
        # 파일 백업 (백업 디렉토리 내에 타임스탬프가 포함된 파일명으로 저장)
        cp "$FILE_TO_MONITOR" "$BACKUP_DIR/backup_$TIMESTAMP.txt"
        
        # 마지막 수정 시간을 갱신
        LAST_MODIFIED_TIME=$CURRENT_MODIFIED_TIME
    fi
    
    # 1초마다 변경 사항을 체크
    sleep 1
done

: