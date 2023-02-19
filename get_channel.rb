require 'net/http'
require 'uri'
require "json"
require 'pp'

TOKEN = "発行したトークン"
SLACK_API_BASE = 'https://slack.com/api'

# チャンネル一覧を取得するAPI
fetch_all_channels_url = "https://slack.com/api/conversations.list?token=#{TOKEN}"
res = Net::HTTP.get(URI.parse(fetch_all_channels_url))
channel_hash = JSON.parse(res)
channels = channel_hash["channels"]
channels = channels.select { |channel| !channel['is_archived'] && !channel['num_members'].zero? } # 削除されたチャンネルや所属人数が0のチャンネルを除外

# メンバー一覧を取得するAPI
fetch_all_members_url = "#{SLACK_API_BASE}/users.list?token=#{TOKEN}"
res = Net::HTTP.get(URI.parse(fetch_all_members_url))
members_hash = JSON.parse(res)
members = members_hash["members"]
members = members.reject { |m| m["deleted"] } # 削除されたユーザーを除外

channels.each do |channel|
  # あるチャンネルに入っているユーザー一覧を取得
  fetch_members_in_channel_url = "#{SLACK_API_BASE}/conversations.members?token=#{TOKEN}&channel=#{channel['id']}"
  res = Net::HTTP.get(URI.parse(fetch_members_in_channel_url))
  next unless res["ok"]

  user_hash = JSON.parse(res)
  user_ids = user_hash["members"]
  user_list = []

  user_ids.each do |id|
    member = members.detect { |m| m["id"] == id }
    user_list << member["real_name"] if member
  end
  # csvで出力
  puts "#{channel['id']},#{channel['name']},#{user_list.join(",")}"
end